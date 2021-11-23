/** @format */

interface Person {
  firstName: string;
  lastName: string | any;
  tags: string[];
  fictional: boolean;
}

// Note that the order and values her are specifically
// chosen to make sure that all possible lines of code
// in a `by` resulting comparison function will be hit.
export const getPeopleMmockData = (): Person[] => {
  return [
    {
      firstName: "Leia",
      lastName: "Organa",
      tags: ["princess", "royalty", "fierce", "Carrie Fisher"],
      fictional: true,
    },
    {
      firstName: "Luke",
      lastName: "Skywalker",
      tags: ["farmboy", "Mark Hamill"],
      fictional: true,
    },
    {
      firstName: "Anakin",
      lastName: "Skywalker",
      tags: ["prodigy", "fallen", "Hayden Christensen"],
      fictional: true,
    },
    {
      firstName: "Han",
      lastName: "Solo",
      tags: ["scoundrel", "smuggler", "Harrison Ford"],
      fictional: true,
    },
    {
      firstName: "Albert",
      lastName: "Einstein",
      tags: ["genius", "e=mc2", "genaral relativity"],
      fictional: false,
    },
    {
      firstName: "John",
      lastName: "Wick",
      tags: ["puppy", "gun kata", "Keanu Reeves"],
      fictional: true,
    },
    {
      firstName: "Rosa",
      lastName: "Parks",
      tags: ["hero", "bus", "front"],
      fictional: true,
    },
    { firstName: "John", lastName: "Doe", tags: ["unknown"], fictional: false },
    {
      firstName: "Sting",
      lastName: null,
      tags: ["the police", "singer"],
      fictional: false,
    },
    {
      firstName: "Björk",
      lastName: null,
      tags: ["singer"],
      fictional: false,
    },
  ];
};
