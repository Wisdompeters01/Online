import * as http from "http";

const port: number = 6000;

const courses: { id: number; title: string; description: string }[] = [
  {
    id: 1,
    title: "Maths",
    description:
      "Mathematics is one of the most important subjects. Mathematics is a subject of numbers, shapes, data, measurements and also logical activities. It has a huge scope in every field of our life, such as medicine, engineering, finance, natural science, economics, etc. We are all surrounded by a mathematical world.",
  },

  {
    id: 2,
    title: "English Language",
    description:
      "the principal method of human communication, consisting of words used in a structured and conventional way and conveyed by speech, writing, or gesture and a system of communication used by a particular country or community",
  },

  {
    id: 3,
    title: "Biology",
    description:
      "the study of living organisms, divided into many specialized fields that cover their morphology, physiology, anatomy, behaviour, origin, and distribution.",
  },

  {
    id: 4,
    title: "Physics",
    description:
      "physics, science that deals with the structure of matter and the interactions between the fundamental constituents of the observable universe. In the broadest sense, physics (from the Greek physikos) is concerned with all aspects of nature on both the macroscopic and submicroscopic levels.",
  },

  {
    id: 5,
    title: "Chemistry",
    description:
      "the branch of science concerned with the substances of which matter is composed, the investigation of their properties and reactions, and the use of such reactions to form new substances.",
  },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/courses") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(courses));
  } else if (req.method === "POST" && req.url === "/courses") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const { title, description } = JSON.parse(data);
        if (!title || !description) {
          res.statusCode = 400;
          res.end(
            JSON.stringify({ error: "Title and description are required." })
          );
          return;
        }

        const newCourse = {
          id: courses.length + 1,
          title,
          description,
        };

        courses.push(newCourse);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(newCourse));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON data." }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
