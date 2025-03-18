// 执行shell命令
const { exec } = require('child_process')

// 执行shell命令 请输入component
const component = process.argv[2]

// 执行shell命令
exec(`mkdir -p packages/${component}/src packages/${component}/docs`)
