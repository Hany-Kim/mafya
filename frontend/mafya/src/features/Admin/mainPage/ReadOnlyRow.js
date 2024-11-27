const ReadonlyRow = ({ student, deleteHandler, updateHandler }) => {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.userCode}</td>
      <td>{student.classCode}</td>
      <td>{student.teamCode}</td>
      <td>{student.phoneNum}</td>
      <td>{student.teamLeader ? "O" : "X"}</td>
      <td>{student.absent}</td>
      <td>{student.trady}</td>
      <td>
        <button type="button" onClick={(event) => updateHandler(student)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteHandler(student.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadonlyRow;
