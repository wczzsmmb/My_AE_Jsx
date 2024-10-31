// 创建一个对话框，提示用户输入数字
var inputNum = parseFloat(prompt("请输入一个数字:", "1"));

// 检查用户输入是否有效
if (!isNaN(inputNum) && inputNum > 0) {
    // 将输入数字乘以 60
    var framesToMove = Math.ceil(inputNum * 60); // 小数点直接进一位

    // 获取当前的激活合成
    var comp = app.project.activeItem;

    if (comp && comp instanceof CompItem) {
        app.beginUndoGroup("Move Forward by Frames");

        // 获取当前时间，并计算目标时间
        var currentTime = comp.time;
        var frameDuration = 1 / comp.frameRate; // 每帧的持续时间
        var newTime = currentTime + (framesToMove * frameDuration);

        // 移动当前时间指针到新时间
        comp.time = newTime;

        app.endUndoGroup();
        alert("已向前移动了 " + framesToMove + " 帧");
    } else {
        alert("请激活一个合成以应用此操作。");
    }
} else {
    alert("请输入一个有效的数字。");
}
