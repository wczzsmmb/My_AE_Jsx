// 获取选中的图层
var comp = app.project.activeItem;
if (comp == null || !(comp instanceof CompItem)) {
    alert("请先选择一个合成。");
} else {
    var layer = comp.selectedLayers[0];
    if (layer == null || !(layer instanceof ShapeLayer)) {
        alert("请先选择一个形状图层。");
    } else {
        var contents = layer.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group");
        var totalLength = 0;

        for (var i = 1; i <= contents.numProperties; i++) {
            var pathGroup = contents.property(i);
            if (pathGroup.matchName == "ADBE Vector Shape - Group") {
                var path = pathGroup.property("ADBE Vector Shape");
                var pathValue = path.value;
                totalLength += getPathLength(pathValue);
            }
        }

        alert("路径总长度为: " + totalLength.toFixed(2) + " 像素");
    }
}

// 计算路径长度的函数
function getPathLength(path) {
    var length = 0;
    var points = path.vertices;
    var inTangents = path.inTangents;
    var outTangents = path.outTangents;
    var isClosed = path.closed;

    for (var i = 0; i < points.length; i++) {
        var currentPoint = points[i];
        var nextIndex = (i + 1) % points.length;
        var nextPoint = points[nextIndex];
        
        if (i < points.length - 1 || isClosed) {
            var outTangent = addPoints(currentPoint, outTangents[i]);
            var inTangent = addPoints(nextPoint, inTangents[nextIndex]);
            length += calculateBezierLength(currentPoint, outTangent, inTangent, nextPoint);
        }
    }

    return length;
}

// 计算贝塞尔曲线长度的函数
function calculateBezierLength(p0, p1, p2, p3) {
    var steps = 20; // 计算曲线的步数，可以调高以增加精度
    var length = 0;
    var previousPoint = p0;

    for (var i = 1; i <= steps; i++) {
        var t = i / steps;
        var currentPoint = calculateBezierPoint(t, p0, p1, p2, p3);
        length += distanceBetweenPoints(previousPoint, currentPoint);
        previousPoint = currentPoint;
    }

    return length;
}

// 计算贝塞尔曲线上某一点的坐标
function calculateBezierPoint(t, p0, p1, p2, p3) {
    var u = 1 - t;
    var tt = t * t;
    var uu = u * u;
    var uuu = uu * u;
    var ttt = tt * t;

    var point = [
        uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0],
        uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1]
    ];

    return point;
}

// 计算两点之间的距离
function distanceBetweenPoints(p1, p2) {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
}

// 向量相加
function addPoints(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
}
