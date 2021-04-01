import React, { FC, useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { Project } from "./Types";
import { Box, Grid, rgbToHex, TextField } from "@material-ui/core";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    description: "Project ID column.",
    width: 200,
    filterable: false,
  },
  {
    field: "name",
    headerName: "Name",
    description: "Project Name column.",
    width: 250,
  },
  {
    field: "score",
    headerName: "Score",
    description: "Project Score column.",
    width: 130,
    renderCell: (params: GridCellParams) => {
      let colorAssigned = "";

      if (Number(params.value) > 90) colorAssigned = "success.main";
      if (Number(params.value) < 70) colorAssigned = "secondary.main";
      return (
        <Box style={{ width: "100%" }} bgcolor={colorAssigned} p={2}>
          {params.value}
        </Box>
      );
    },
  },
  {
    field: "durationInDays",
    headerName: "Duration",
    description: "Project Duration column.",
    type: "number",
    width: 150,
  },
  {
    field: "bugsCount",
    headerName: "# bugs",
    description: "Project number of bugs column.",
    type: "number",
    width: 100,
  },
  {
    field: "madeDadeline",
    headerName: "Deadline",
    description: "Project Deadline achived.",
    width: 150,
  },
];

export interface DataTableProps {
  data: Project[];
  filter: {
    nameFilter: string;
    scoreFilterMin: number;
    scoreFilterMax: number;
    durationFilterMin: number;
    durationFilterMax: number;
    bugsFilterMin: number;
    bugsFilterMax: number;
    deadLineFilter: string;
  };
}

export const DataTable: FC<DataTableProps> = (props) => {
  const [rowsFixed, setRowsFixed] = useState(props.data);

  useEffect(() => {
    setRowsFixed(props.data);
  }, [props.data]);

  // Whenever our filter object is changing, we filter data accordingly
  useEffect(() => {
    let temp = props.data;
    temp = filterByName(temp);
    temp = filterByScore(temp);
    temp = filterByDuration(temp);
    temp = filterByBugs(temp);
    temp = filterByDeadLine(temp);
    setRowsFixed(temp);
  }, [props.filter]);

  /*
///////////////////////////////////////
///////////////////////////////////////
!             fILTERS_START
///////////////////////////////////////
///////////////////////////////////////
*/
  function filterByName(data: Project[]) {
    let ans: Project[] = [];
    if (props.filter.nameFilter.length > 0) {
      data.forEach((project: Project) => {
        if (
          project.name
            .toLocaleLowerCase()
            .includes(props.filter.nameFilter.toLocaleLowerCase())
        ) {
          ans.push(project);
        }
      });
      return ans;
    }
    return data;
  }

  function filterByScore(data: Project[]) {
    let ans: Project[] = [];
    if (props.filter.scoreFilterMin >= 0) {
      data.forEach((project: Project) => {
        if (
          project.score >= props.filter.scoreFilterMin &&
          project.score <= props.filter.scoreFilterMax
        ) {
          ans.push(project);
        }
      });
      return ans;
    }
    return data;
  }

  function filterByDuration(data: Project[]) {
    let ans: Project[] = [];
    if (props.filter.durationFilterMin >= 0) {
      data.forEach((project: Project) => {
        if (
          project.durationInDays >= props.filter.durationFilterMin &&
          project.durationInDays <= props.filter.durationFilterMax
        ) {
          ans.push(project);
        }
      });
      return ans;
    }
    return data;
  }

  function filterByBugs(data: Project[]) {
    let ans: Project[] = [];
    if (props.filter.bugsFilterMin >= 0) {
      data.forEach((project: Project) => {
        if (
          project.bugsCount >= props.filter.bugsFilterMin &&
          project.bugsCount <= props.filter.bugsFilterMax
        ) {
          ans.push(project);
        }
      });
      return ans;
    }
    return data;
  }

  function filterByDeadLine(data: Project[]) {
    let ans: Project[] = [];
    if (props.filter.deadLineFilter.length > 0) {
      data.forEach((project: Project) => {
        if (project.madeDadeline.toString() === props.filter.deadLineFilter) {
          ans.push(project);
        }
      });
      return ans;
    }
    return data;
  }
  /*
///////////////////////////////////////
///////////////////////////////////////
!             fILTERS_END
///////////////////////////////////////
///////////////////////////////////////
*/

  // function returns AVG of all shown projects scores
  function getAvg() {
    let sum = 0;
    rowsFixed.forEach((project: Project) => {
      sum += project.score;
    });

    return (sum / rowsFixed.length).toPrecision(3);
  }

  // function returns Rate of all shown projects who are done in time
  function getDeadLineSuccessRate() {
    let count = 0;
    rowsFixed.forEach((project: Project) => {
      if (project.madeDadeline) count += 1;
    });

    return count.toString() + " / " + rowsFixed.length.toString();
  }

  // pre made constant for displaying AVG of shown projects
  const summery = () => {
    return rowsFixed.length > 0 ? (
      <div>
        <label>
          <strong>AVG:</strong> {getAvg()}
        </label>{" "}
        <br />
        <label>
          <strong>On time:</strong> {getDeadLineSuccessRate()}
        </label>{" "}
        <br />
      </div>
    ) : (
      <div></div>
    );
  };

  return (
    <div style={{ height: "70%", width: "100%" }}>
      <br />
      <br />

      {summery()}

      <br />
      <br />
      <DataGrid rows={rowsFixed} columns={columns} disableColumnMenu />
    </div>
  );
};
