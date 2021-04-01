import React, { FC } from "react";
import { TextField } from "@material-ui/core";

// We wish to verify if number input is  only digits or in  range
function isStringOnlyDigits(str: string) {
  let regex = new RegExp(/^[1-9]+[0-9]*$/);
  return regex.test(str) || str === "0";
}

function isStringWithRange(str: string) {
  let regex = new RegExp(/^[0-9]+-[0-9]+$/);
  return regex.test(str);
}

function getValidInput(str: string) {
  return isStringOnlyDigits(str) || isStringWithRange(str);
}

/*
We Filter by:
  1. Name
  2. Score(min, max)
  3. Duration(min, max)
  4. Bugs(min, max)
  5. Deadline("True", "False", "All")
*/
export interface RowsFilterProps {
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setScoreFilterMin: React.Dispatch<React.SetStateAction<number>>;
  setScoreFilterMax: React.Dispatch<React.SetStateAction<number>>;
  setDurationFilterMin: React.Dispatch<React.SetStateAction<number>>;
  setDurationFilterMax: React.Dispatch<React.SetStateAction<number>>;
  setBugsFilterMin: React.Dispatch<React.SetStateAction<number>>;
  setBugsFilterMax: React.Dispatch<React.SetStateAction<number>>;
  setDeadLineFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const RowsFilter: FC<RowsFilterProps> = (props) => {
  // If Score input is valid we assign Score Filter...
  function handleChangeScore(score: string) {
    if (score.length === 0) {
      props.setScoreFilterMin(0);
      props.setScoreFilterMax(1e10);
    }
    if (getValidInput(score)) {
      if (isStringOnlyDigits(score)) {
        props.setScoreFilterMin(Number(score));
        props.setScoreFilterMax(1e10);
      } else {
        const ranges = score.split("-");
        props.setScoreFilterMin(Number(ranges[0]));
        props.setScoreFilterMax(Number(ranges[1]));
      }
    } else {
      props.setScoreFilterMin(0);
      props.setScoreFilterMax(1e10);
    }
  }

  // If Duration input is valid we assign Duration Filter...
  function handleChangeDuration(duration: string) {
    if (duration.length === 0) {
      props.setDurationFilterMin(0);
      props.setDurationFilterMax(1e10);
    }
    if (getValidInput(duration)) {
      if (isStringOnlyDigits(duration)) {
        props.setDurationFilterMin(Number(duration));
        props.setDurationFilterMax(1e10);
      } else {
        const ranges = duration.split("-");
        props.setDurationFilterMin(Number(ranges[0]));
        props.setDurationFilterMax(Number(ranges[1]));
      }
    } else {
      props.setDurationFilterMin(0);
      props.setDurationFilterMax(1e10);
    }
  }

  // If Bugs input is valid we assign Bugs Filter...
  function handleChangeBugs(bugs: string) {
    if (bugs.length === 0) {
      props.setBugsFilterMin(0);
      props.setBugsFilterMax(1e10);
    }
    if (getValidInput(bugs)) {
      if (isStringOnlyDigits(bugs)) {
        props.setBugsFilterMin(Number(bugs));
        props.setBugsFilterMax(1e10);
      } else {
        const ranges = bugs.split("-");
        props.setBugsFilterMin(Number(ranges[0]));
        props.setBugsFilterMax(Number(ranges[1]));
      }
    } else {
      props.setBugsFilterMin(0);
      props.setBugsFilterMax(1e10);
    }
  }

  // If Bugs input is valid we assign Bugs Filter...
  // I.E ->
  // Input may be "False" or "F"  || "True" or "T" (NOT CAMEL SENSITIVE)
  function handleChangeDeadLine(deadLine: string) {
    if (deadLine.toLowerCase() === "true" || deadLine.toLowerCase() === "t")
      props.setDeadLineFilter("true");
    if (deadLine.toLowerCase() === "false" || deadLine.toLowerCase() === "f")
      props.setDeadLineFilter("false");
    if (
      deadLine.toLowerCase() !== "true" &&
      deadLine.toLowerCase() !== "t" &&
      deadLine.toLowerCase() !== "false" &&
      deadLine.toLowerCase() !== "f"
    )
      props.setDeadLineFilter("");
  }

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setNameFilter(e.target.value)
        }
      />
      <TextField
        id="standard-basic"
        label="DeadLine"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeDeadLine(e.target.value)
        }
      />
      <br />
      <br />
      <TextField
        id="standard-basic"
        label="Score"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChangeScore(e.target.value);
        }}
      />
      <TextField
        id="standard-basic"
        label="Duration"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChangeDuration(e.target.value);
        }}
      />
      <TextField
        id="standard-basic"
        label="Bugs"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChangeBugs(e.target.value);
        }}
      />
    </div>
  );
};
