// 遇到運算元則堆疊後轉值輸出
// 遇到運算子進入運算子堆疊
// 運算子輸出規則 堆疊中之優先順序大於等於讀入之則輸出 遇右括號輸出直到遇到左括號
$(function() {
    //運算子陣列
    var opArray = [];
    // 運算元暫存
    var tempString = "";
    // 後序式陣列
    var outputArray = [];
    // 後序式
    var output = "";
    // 答案
    var answer = "";
    //點擊enter開始計算
    $('#enter').click(function() {
            // 取得輸入的中序式
            var string = $('#input').val();
            // 放入前台並清空輸入框
            $('.input-text').html(string);
            $('#input').val("");
            // 分割並放入陣列
            var stringArray = string.split('');
            for (i = 0; i <= string.length; i++) {
                // 判斷元素為運算元或運算子
                var element = stringArray[i];
                if (element != undefined) {
                    if (isSymbol(element)) {
                        // 遇到運算子則運算元暫存放入陣列
                        if (tempString != "") {
                            outputArray.push(parseInt(tempString));
                        }
                        tempString = "";
                        // 運算子計算
                        opcal(element);
                    } else {
                        // 運算元直接輸出
                        tempString += element;
                    }
                } else {
                    // 輸出剩餘運算元
                    if (tempString != "") {
                        outputArray.push(parseInt(tempString));
                        tempString = "";
                    }
                    if (opArray[0] != undefined) {
                        // 輸出剩餘運算子
                        var l = opArray.length;
                        for (y = 0; y < l; y++) {
                            outputArray.push(opArray.pop());
                        }
                    }
                }
            }
            for (i = 0; i < outputArray.length; i++) {
                // 輸出後序式至前台顯示
                output += outputArray[i];
                output += "  ";
            }
            $('.output-text').html(output);
            outputcal();
            // 初始化
            opArray = [];
            tempString = "";
            outputArray = [];
            output = "";
            answer = "";
        })
        // 判斷是否為運算子
    function isSymbol(element) {
        if (element == '(' || element == ')' || element == '^' ||
            element == '+' || element == '-' || element == '*' ||
            element == '/') {
            // 運算子計算
            return true;
        } else {
            return false;
        }
    }
    // 計算運算子
    function opcal(op) {
        // 陣列為空時push
        if (opArray.length == 0) {
            opArray.push(op);
        } else {
            var pr = getPriority(op);
            if (pr == 1) {
                // 左括弧push
                opArray.push(op);
            }
            if (pr == 2) {
                // 右刮弧輸出直到遇到左括弧
                for (i = opArray.length; i > 0; i--) {
                    if (opArray[i - 1] != '(') {
                        // 輸出運算子
                        outputArray.push(opArray.pop());
                    } else {
                        opArray.pop();
                        break;
                    }
                }
            } else {
                var i = opArray.length - 1;
                var arrayPr = getPriority(opArray[i])
                if (arrayPr == 1) {
                    // 清除左括弧
                    opArray.pop();
                } else {
                    // 如果堆疊中運算子優先順序大於等於輸入運算子則輸出
                    if (arrayPr <= pr) {
                        outputArray.push(opArray.pop());

                    }
                }
                opArray.push(op);
            }
        }
    }
    // 取得優先順序 
    function getPriority(op) {
        switch (op) {
            case '(':
                return 1;
                break;
            case ')':
                return 2;
                break;
            case '^':
                return 3;
                break;
            case '*':
                return 3;
                break;
            case '/':
                return 3;
                break;
            case '+':
                return 4;
                break;
            case '-':
                return 4;
                break;
        }
    }
    // 計算答案
    function outputcal() {
        // 計算用陣列
        var calArray = [];
        for (i = 0; i < outputArray.length; i++) {
            var element = outputArray[i];
            // 第一運算元
            var n1 = 0;
            // 第二運算元
            var n2 = 0;
            // 結果暫存
            var t = 0;
            if (isSymbol(element)) {
                // 取出運算元
                n1 = calArray.pop();
                n2 = calArray.pop();
                // 計算
                switch (element) {
                    case '^':
                        t = n2;
                        for (x = 1; x < n1; x++) {
                            t = t * n2;
                        }
                        break;
                    case '+':
                        t = n2 + n1;
                        break;
                    case '-':
                        t = n2 - n1;
                        break;
                    case '*':
                        t = n2 * n1;
                        break;
                    case '/':
                        t = n2 / n1;
                        break;
                }
                calArray.push(t);
            } else {
                calArray.push(element);
            }
        }
        // 輸出答案至前台顯示
        answer = calArray.pop();
        $('.answer-text').html(answer);
    }
})
