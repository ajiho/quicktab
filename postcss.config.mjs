export default context => {
  return {
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
    plugins: {
      //自动添加厂商前缀
      autoprefixer: {
        cascade: false
      }
    }
  }
}