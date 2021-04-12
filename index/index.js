import IntersectionObserver from './intersection-observer.js';
Page({
  data: {
    total:  [
      {name:1,id:1},
      {name:2,id:2},
      {name:3,id:3},
      {name:4,id:4},
      {name:5,id:5},
      {name:6,id:6},
      {name:7,id:7},
      {name:8,id:8},
      {name:9,id:9},
    ],
    keysMap:{}
  },
  onLoad: function () {
    this.ob = new IntersectionObserver({
      selector: '.block',
      observeAll: true,
      context: this,
      onEach: ({ dataset }) => {
        const { info } = dataset || {}
        if(!this.data.keysMap[info.id]){
          let map = this.data.keysMap;
          map[info.id] = true;
          this.setData({
            keysMap:map
          })
          return info.id
        }
        
      },
      onFinal: args => {
        if (!args || args.length === 0) return
        console.log('数据上报：', args)
      },
    })
    this.ob.connect()
  },
  onReachBottom() {
    setTimeout(() => {
      let len = this.data.total.length;
      this.setData({
        total: [...this.data.total, {name:len+1,id:len+1}]
      }, () => {
        this.ob.reconnect();
      })
    }, 500)

  }
})
