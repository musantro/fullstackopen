import React from "react";

const Total = ({parts}) => <strong>total of {parts.map(p => p.exercises).reduce((a, b) => a + b)} exercises</strong>;

export default Total;
