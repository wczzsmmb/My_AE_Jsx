{
    function shiftLayerBackward16Frames() {
        var comp = app.project.activeItem; // 获取当前活动的合成
        if (comp == null || !(comp instanceof CompItem)) {
            alert("请选中一个合成");
            return;
        }

        var selectedLayers = comp.selectedLayers; // 获取选中的图层
        if (selectedLayers.length == 0) {
            alert("请选中一个图层");
            return;
        }

        var frameDuration = comp.frameDuration; // 每帧的持续时间
        var shiftTime = 16 * frameDuration; // 16帧对应的时间

        app.beginUndoGroup("Shift Layer Backward 16 Frames"); // 开始撤销组
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            layer.startTime -= shiftTime; // 将图层的开始时间向后移动 16 帧
        }
        app.endUndoGroup(); // 结束撤销组
    }

    shiftLayerBackward16Frames(); // 执行函数
}
