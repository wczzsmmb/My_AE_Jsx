{
    function scaleSelectedLayersTo43Percent() {
        // 确保有项目被打开
        if (app.project === null) {
            alert("请先打开一个项目。");
            return;
        }

        // 确保有一个合成被打开
        if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) {
            alert("请先打开一个合成。");
            return;
        }

        var comp = app.project.activeItem;
        var selectedLayers = comp.selectedLayers;

        // 确保有图层被选中
        if (selectedLayers.length === 0) {
            alert("请先选中一个或多个图层。");
            return;
        }

        // 开始撤销组
        app.beginUndoGroup("Scale to 43%");

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            // 将图层缩放到43%
            layer.property("Scale").setValue([43, 43]);
        }

        // 结束撤销组
        app.endUndoGroup();
    }

    // 执行函数
    scaleSelectedLayersTo43Percent();
}