import themeArray from './themeArray';

export  const global = {
    /**
     * 切换主题函数
     */
    changeTheme:function(themeValue){
        // var that = this;
        // console.log('切换主题颜色值：',themeValue,that.staticPath,JSON.stringify(themeArray) );
        //需要移到单独的文件存放
        var cssArray = themeArray;
        removeCss()
        for (let i = 0 ,len = cssArray.length; i < len; i++) {
            var itemPath = process.env.BASE_URL+ 'theme/' +themeValue+'/'+cssArray[i].toLowerCase()+'.css';
            loadCss(itemPath)
        }
        // sessionStorage.setItem("themeValue",themeValue)

        function loadCss(path){
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
                link.href = path;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                head.appendChild(link);
            
        }
        function removeCss() {
            const links = document.getElementsByTagName("link");
            const head = document.getElementsByTagName('head')[0];
            let arr = []
            if(links && links.length > 0) {
                for (let i = 0, len =  links.length; i < len ; i++) {
                    if (links[i]) {
                        arr.push(links[i]);
                    }
                }
                for (let i = 0, len = arr.length; i< len ;i++ ) {
                    head.removeChild(arr[i])
                }
            }
        }

    }
};
    

// export default global
