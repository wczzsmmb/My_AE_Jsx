{
    function selectBlueLabelLayers() {
        var comp = app.project.activeItem; // 获取当前活动的合成
        if (comp == null || !(comp instanceof CompItem)) {
            alert("请选中一个合成");
            return;
        }

        var blueLabelColorIndex = 8; // 蓝色标签的索引

        var layers = comp.layers;
        app.beginUndoGroup("Select Blue Label Layers"); // 开始撤销组

        // 取消选择所有图层
        for (var i = 1; i <= layers.length; i++) {
            layers[i].selected = false;
        }

        // 选择所有标签为蓝色的图层
        for (var i = 1; i <= layers.length; i++) {
            var layer = layers[i];
            if (layer.label == blueLabelColorIndex) {
                layer.selected = true;
            }
        }

        app.endUndoGroup(); // 结束撤销组
    }

    selectBlueLabelLayers(); // 执行函数
}
