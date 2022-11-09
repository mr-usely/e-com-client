export default {
  button: {
    danger: {
      base: "text-white bg-red-600 border border-transparent",
      active:
        "active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300",
      disabled: "opacity-50 cursor-not-allowed",
    },
    primary: {
      base: "text-white bg-green-500 border border-transparent",
      active: 'active:bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300',
      disabled: 'opacity-50 cursor-not-allowed'
    }
  },
  input: {
    active:
      'focus:border-green-400 border-gray-300 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700'
  },
  textarea: {
    active:
    'focus:border-green-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-green-300'
  },
  select: {
    base: 'block w-full text-sm dark:text-gray-300 focus:outline-none rounded-md',
    active:
      'focus:border-green-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring focus:ring-green-300 dark:focus:ring-gray-300 dark:focus:border-gray-600'
  }
};
