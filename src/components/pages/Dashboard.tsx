import React, { FC, useEffect, useState } from "react";
import { getDataByToken } from "../utils/API";
import { DataTable } from "../utils/Table";
import { Project, User, initialProject } from "../utils/Types";
import { RowsFilter } from "../utils/TextFilter";

interface DashboardProps {
  user: User;
}

export const Dashboard: FC<DashboardProps> = (props) => {
  // data is all the data we fetch from API, (All user's projects)
  const [data, setData] = useState<Project[]>([initialProject]);
  const [nameFilter, setNameFilter] = useState("");

  const [scoreFilterMin, setScoreFilterMin] = useState(0);
  const [scoreFilterMax, setScoreFilterMax] = useState(1e10);

  const [durationFilterMin, setDurationFilterMin] = useState(0);
  const [durationFilterMax, setDurationFilterMax] = useState(1e10);

  const [bugsFilterMin, setBugsFilterMin] = useState(0);
  const [bugsFilterMax, setBugsFilterMax] = useState(1e10);

  const [deadLineFilter, setDeadLineFilter] = useState("");

  // When ever this function is first invoked, we fetch all
  // user's project and initial them under data variable.
  useEffect(() => {
    async function fetchUserProjects() {
      const data: Project[] = await getDataByToken(props.user.token);
      setData(data);
    }

    fetchUserProjects();
  }, []);

  // Simple variable holds the user-metaData for representing
  const userDetails = (
    <div>
      <img
        src={props.user.personalDetails.avatar}
        className={"avatar"}
        alt=""
      />
      <br />
      <strong>
        {" "}
        <label>Token: {props.user.token}</label>
      </strong>

      <br />
      <label>Name: {props.user.personalDetails.name}</label>
      <br />
      <label>Team: {props.user.personalDetails.Team}</label>
      <br />
      <label>Joined: {props.user.personalDetails.joinedAt}</label>
      <br />
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "90%",
        height: "90%",
      }}
    >
      <div style={{ width: "30%", paddingTop: "100px", paddingRight: "50px" }}>
        {userDetails}
        {""}
      </div>
      <div style={{ width: "80%" }}>
        {/*
        This components is incharge of getting all Filters
        */}
        <RowsFilter
          setNameFilter={setNameFilter}
          setScoreFilterMin={setScoreFilterMin}
          setScoreFilterMax={setScoreFilterMax}
          setDurationFilterMin={setDurationFilterMin}
          setDurationFilterMax={setDurationFilterMax}
          setBugsFilterMin={setBugsFilterMin}
          setBugsFilterMax={setBugsFilterMax}
          setDeadLineFilter={setDeadLineFilter}
        />

        {/*
        This components is incharge of presenting the data with all Filters
        */}
        <DataTable
          data={data}
          filter={{
            nameFilter,
            scoreFilterMin,
            scoreFilterMax,
            durationFilterMin,
            durationFilterMax,
            bugsFilterMin,
            bugsFilterMax,
            deadLineFilter,
          }}
        />
      </div>
    </div>
  );
};
