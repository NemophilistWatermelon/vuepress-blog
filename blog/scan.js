/* 
  配置一个文件扫描器
  读取 blog 根目录文件夹下的所有 md 文件
*/

const fs = require('fs')

// node 读取目录下的所有文件
const readDir = function (dir) {
  try {
    const files = fs.readdirSync(dir)    
    return files
  } catch (error) {
    console.log(error, '读取文件夹错误')
  }
}

// 读取数组中以 md 结尾的字符串
const readMd = function (files, exclude = []) {
  const mdFiles = []
  files.forEach(item => {
    if (item.endsWith('.md') && !exclude.includes(item)) {
      mdFiles.push(item)
    }
  })
  return mdFiles
}

// 根据 md arr
const fileMdName = function (mdArray) {
  var result = mdArray.map(item => {
    const fileName = item.split('.md')[0]
    return fileName
  })
  return result
}

const writeConfigBy = function (config) {
  const path = require('path')
  const mode = {
    encoding: 'utf-8'
  }
  
  const res = fs.writeFileSync(path.join(__dirname + '/docs/.vuepress/config.js'), 'module.exports =' + JSON.stringify(config, null, 2), mode)
  if (res) {
    console.log('文件扫描配置成功 ***********')
  }

}

// 读取 config.js 文件修改内容
const readConfigAndWrite = function (result) {
  const config = require('./docs/.vuepress/config')
  /* 个人的配置 */
  const _self_config = require('./page.config')

  config.title = _self_config.title
  config.description = _self_config.description

  var themeConfig = config.themeConfig
  themeConfig.sidebar['/'] = result
  
  // 重写 config.js 文件
  writeConfigBy(config)
}


const __main = function () {
  const path = './docs'
  const fileList = readDir(path)
  const mdFileName = readMd(fileList, ['README.md'])
  const result = fileMdName(mdFileName)
  readConfigAndWrite(result)
  console.log('监测到文件变动.....')
}


// 使用 Node.js 监控文件夹变化
const chokidar = require('chokidar')
const watcher = chokidar.watch(__dirname + '/docs')
watcher
  .on('add', __main)
  .on('unlink', __main)
__main()
if (watcher) {
  __main()
}
