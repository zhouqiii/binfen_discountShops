/*
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-09-28 16:47:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\utils\commonInterface.js
 */
//防止背景色添加出错
function addBodyOver () {
    document.body.style.overflow="hidden"
}
function moveBodyOver(){
    document.body.style.overflow="auto"
}
export {
    addBodyOver,
    moveBodyOver
}