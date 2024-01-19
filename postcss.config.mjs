import autoprefixer from "autoprefixer";

export default context => {
  return {
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true
    },
    plugins: [
      autoprefixer({
        //禁用级联效果(厂商前缀对齐)
        cascade: false
      })
    ],
  }
};


