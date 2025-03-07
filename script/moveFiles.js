import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// 移动文件函数
function moveFiles(sourceDir, targetDir) {
  // 如果源目录不存在，直接返回
  if (!fs.existsSync(sourceDir)) {
    console.log(`Source directory ${sourceDir} does not exist`)
    return
  }

  // 确保目标目录存在
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // 读取源目录中的所有文件
  const files = fs.readdirSync(sourceDir)

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file)
    const targetPath = path.join(targetDir, file)

    if (fs.statSync(sourcePath).isDirectory()) {
      // 递归处理子目录
      moveFiles(sourcePath, targetPath)
      // 移动完成后删除空目录
      if (fs.readdirSync(sourcePath).length === 0) {
        fs.rmdirSync(sourcePath)
      }
    } else {
      // 如果目标文件已存在，先删除
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath)
      }
      // 移动文件
      fs.renameSync(sourcePath, targetPath)
    }
  })
}

// 主函数
async function main() {
  try {
    // 确保目标目录存在
    const tempEsDir = path.resolve(rootDir, 'es')
    const tempLibDir = path.resolve(rootDir, 'lib')

    // 移动 ES 模块文件
    console.log('Moving ES modules...')
    moveFiles(path.resolve(rootDir, 'odos-ui/es/packages'), tempEsDir)

    // 移动 CommonJS 文件
    console.log('Moving CommonJS modules...')
    moveFiles(path.resolve(rootDir, 'odos-ui/lib/packages'), tempLibDir)

    // 删除原始的 odos-ui 目录
    if (fs.existsSync(path.resolve(rootDir, 'odos-ui'))) {
      fs.rmSync(path.resolve(rootDir, 'odos-ui'), { recursive: true, force: true })
    }

    console.log('Files moved successfully!')
  } catch (error) {
    console.error('Error moving files:', error)
    process.exit(1)
  }
}

main()
