import { rest } from "msw";

export const handlers = [
  rest.get("https://api.themoviedb.org/3/movie/popular", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            id: 1,
            title: "Sample Movie",
            poster_path: "/sample.jpg",
            overview: "A great movie",
          },
        ],
        total_results: 1,
      }),
      ctx.status(200)
    );
  }),
];
