const routes = (handler) => [
  {
    method: "POST",
    path: "/threads",
    handler: handler.postThreadHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "GET",
    path: "/threads/{threadId}",
    handler: handler.getThreadHandler,
  },
  {
    method: "GET",
    path: "/threads",
    handler: (request, h) => {
      return h
        .response({
          status: "success",
          message: "Rate limit test endpoint",
        })
        .code(200);
    },
  },
];

module.exports = routes;
