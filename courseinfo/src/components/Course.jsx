const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      total of {props.course.parts.reduce((sum, part) => (sum += part.exercises), 0)}{" "} exercises
    </p>
  );
};

const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </>
  );
};

export default Course;
