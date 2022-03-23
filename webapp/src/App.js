import './App.css';
import lectionary from './lectionary.json'
import React, { Component } from 'react'

class PassageView extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedOption: 'psalm', passage: this.props.psalm, id: 'psalm' }
  }

  handleChange = (event) => {
    const newOption = event.target.value
    let id = ''
    let passage = ''

    if (newOption === 'psalm') {
      passage = this.props.psalm
      id = 'psalm'
    } else if (newOption === 'mp-lesson-1') {
      passage = this.props.firstLesson
      id = 'lesson-1'
    } else if (newOption === 'mp-lesson-2') {
      passage = this.props.secondLesson
      id = 'lesson-2'
    }

    this.setState({
      selectedOption: newOption,
      passage: passage,
      id: id
    })
  }

  render() {
    return (
      <div className="passage-viewer">
        <PassageSelector
          selectedOption={this.state.selectedOption}
          handleChange={this.handleChange} />

        <PassagePlayer passage={this.state.passage} id={this.state.id} />
        <PassageText passage={this.state.passage} id={this.state.id} />
      </div>
    )
  }
}

class PassageSelector extends Component {
  render() {
    return (
      // HACK: for whatever reason I can't get the 'checked' attribute to work
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className={`btn btn-secondary ${this.props.selectedOption === 'psalm' ? "active" : ""}`}>
          <input type="radio" name="options" value="psalm" id="psalm"
            onChange={this.props.handleChange} /> Psalm
        </label>
        <label className={`btn btn-secondary ${this.props.selectedOption === 'mp-lesson-1' ? "active" : ""}`}>
          <input type="radio" name="options" value="mp-lesson-1" id="mp-lesson-1"
            onChange={this.props.handleChange} /> Lesson 1
        </label>
        <label className={`btn btn-secondary ${this.props.selectedOption === 'mp-lesson-2' ? "active" : ""}`}>
          <input type="radio" name="options" value="mp-lesson-2" id="mp-lesson-2"
            onChange={this.props.handleChange} /> Lesson 2
        </label>
      </div>
    )
  }
}

class PassagePlayer extends Component {
  render() {
    return (
      <div className="player">
        <iframe
          title={this.props.id}
          src={`https://www.esv.org/audio-player/${encodeURIComponent(this.props.passage)}/`}
          style={{ border: 0, background: 'none', color: 'white', width: '100%' }}>
        </iframe>
      </div>
    )
  }
}

class PassageText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      passages: [],
      cachedFetches: new Map()
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.passage !== prevProps.passage) {
      console.log("request: " + this.props.passage)
      this.fetchData()
    }
  }

  fetchData() {
    if (this.state.cachedFetches.has(this.props.passage)) {
      console.log(this.props.passage + " found in cache")
      let passageToSet = this.state.cachedFetches.get(this.props.passage)
      this.setState({
        isLoaded: true,
        passages: passageToSet
      });
    }
    else {
      const url = `http://192.168.1.177:8000/passage/text?q=${encodeURIComponent(this.props.passage)}`
      console.log("fetch " + url)
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            let fetches = this.state.cachedFetches
            fetches.set(this.props.passage, result.passages)

            this.setState({
              isLoaded: true,
              passages: result.passages,
              cachedFetches: fetches
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  render() {
    const { error, isLoaded, passages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>loading passage text...</div>;
    } else {
      return (
        <div>
          {passages.map((passageHTML, index) => (
            <p className="esv-text" key={index} dangerouslySetInnerHTML={ {__html: passageHTML} }/>
          ))}
        </div>
      );
    }
  }
}

class Example extends Component {
  constructor(props) {
    super(props)
    const date = new Date()

    this.state = {
      date: date,
      dateString: this.formatDate(date),
      firstLesson: this.getReadingForDate(date, "mp_lesson_1"),
      secondLesson: this.getReadingForDate(date, "mp_lesson_2"),
      psalm: this.getReadingForDate(date, "mp_psalm")
    }
  }

  formatDate(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: "America/New_York" }

    return date.toLocaleDateString("en-US", options) // Saturday, September 17, 2016
  }

  /**
   * Gets a reading for a particular date.
   *
   * @param {Date}   date The date for which to look up the reading
   * @param {String} key  The reading key (e.g., psalm)
   */
  getReadingForDate(date, key) {
    const index = date.toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', timeZone: "America/New_York" }).replace("/", "-")

    // Look up data
    const row = lectionary[index]
    return row[key]
  }

  render() {
    return (
      <div>
        <h2>{this.state.dateString}</h2>
        <PassageView psalm={this.state.psalm} firstLesson={this.state.firstLesson} secondLesson={this.state.secondLesson} />
        {/* <PassagePlayer passage={this.state.psalm} title="Psalm" id="Psalm" />
        <PassagePlayer passage={this.state.firstLesson} title="First Lesson" id="mp-lesson-1" />
        <PassagePlayer passage={this.state.secondLesson} title="Second Lesson" id="mp-lesson-2" /> */}

        <footer>Unless otherwise indicated, all Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. You may not copy or download more than 500 consecutive verses of the ESV Bible or more than one half of any book of the ESV Bible.</footer>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="App">
          <Example />
        </div>
      </div>
    );
  };
}

export default App;
