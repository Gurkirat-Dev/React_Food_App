import UserClass from "./UserClass";

const About = () => {
  return (
    <div className="bg-gray-50 w-full h-full flex flex-col justify-center gap-10">
      <h1 className="bg-orange-400 w-fit p-2 rounded self-center mt-10 font-semibold">
        About
      </h1>
      <div className="flex gap-10 flex-col justify-center items-center">
        <h2 className="text-2xl">
          This part made with <u>Class Component</u>
        </h2>
        <UserClass location={"Mississauga"} name={"Gurkirat"} />
      </div>
    </div>
  );
};

export default About;
