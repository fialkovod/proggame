export const timeout = function (ctx, func, ms) {
  let timeout, promise;
  promise = new Promise(function (resolve, reject) {
    timeout = setTimeout(() => resolve(func(ctx)), ms);
  });
  return {
    promise: promise,
    cancel: function () {
      clearTimeout(timeout);
    },
  };
};

export function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
