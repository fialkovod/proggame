export const timeout = function (ctx, func, ms) {
  let to, promise;
  promise = new Promise(function (resolve, reject) {
    to = setTimeout(() => resolve(func(ctx)), ms);
  });
  return {
    promise: promise,
    cancel: function () {
      clearTimeout(to);
    },
  };
};

export function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
