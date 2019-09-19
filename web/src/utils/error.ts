export const getErrorData = (error: any) => {
  try {
    return error.response.data
  } catch (e) {
    return {
      message: null,
      statusCode: null,
      type: 'error',
    }
  }
}
