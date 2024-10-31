{
    function moveForwardFiveSeconds() {
        // 获取当前的项目
        var proj = app.project;
        if (!proj) {
            return;
        }

        // 获取当前合成
        var activeItem = proj.activeItem;
        if (!(activeItem instanceof CompItem)) {
            return;
        }

        // 获取当前时间
        var currentTime = activeItem.time;

        // 向前移动五秒
        var newTime = currentTime + 1;

        // 检查是否超过合成的总时长
        if (newTime > activeItem.duration) {
            return;
        }

        // 设置新的时间
        activeItem.time = newTime;
    }

    // 包装在undo group中
    app.beginUndoGroup("Move Forward Five Seconds");
    moveForwardFiveSeconds();
    app.endUndoGroup();
}
