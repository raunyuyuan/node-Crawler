// 需要流，边写，边读
import fs from 'fs'
let source = fs.readFileSync('src/stream/hsy.jpeg')

fs.writeFileSync('src/stream/hsy_mywife.jpeg', source)
