import React, { useState } from "react";
import RadioButtonGroup from "./RadioButtonGroup";

import {  NewEntry } from "../types";

export interface EntryFormProps {
    addEntry: (newEntry: NewEntry) => void
 
}

const EntryForm: React.FC<EntryFormProps> = ({ addEntry }) => {
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState<string>("");
  const visibilities = ['great', 'good', 'ok','poor']
  const weathers = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']

  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd: NewEntry = {
      date: date.trim(),
      visibility: visibility.trim(),
      weather: weather.trim(),
      comment: comment.trim(),
    };
    addEntry(entryToAdd)

 

    setWeather("");
    setVisibility("");
    setDate("");
    setComment("");
  };

  return (
    <form onSubmit={createEntry}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <RadioButtonGroup
        label="Weather"
        options={weathers}
        selectedOption={weather}
        onChange={setWeather} // Pass setWeather to update state
      />
      <RadioButtonGroup
        label="Visibility"
        options={visibilities}
        selectedOption={visibility}
        onChange={setVisibility} // Pass setVisibility to update state
      />
      <div>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default EntryForm;
