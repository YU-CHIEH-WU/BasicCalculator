$(function() {
    var input = "";
    var inputArray = [];
    var element = "";
    var tempString = "";
    var posArray = [];
    var posString = "";
    var opArray = [];
    var opArrayCount = 0;
    var arrayPr = 0;
    var elementPr = 0;
    $('#enter').on('click', function() {
        // 初始化
        posArray = [];
        opArray = [];
        posString = "";
        // 放入使用者輸入的算式
        input = $('#input').val();
        // 分割成字串陣列
        inputArray = input.split("");
        // 放入中序式輸出區
        $('.input-text').html(input);
        // 清空輸入區
        $('#input').val("");
        for (i = 0; i < inputArray.length; i++) {
            //過濾空白字元
            if (inputArray[i] != ' ' | inputArray[i] != '　') {
                element = inputArray[i];
                // 判斷是否為運算元
                if (isSymbol(element)) {
                    // 判斷是否有堆疊中的運算子
                    if (tempString != "") {
                        // 輸出堆疊的運算子並轉成float
                        posArray.push(parseFloat(tempString));
                        tempString = "";
                        console.log(posArray);
                    }
                    // 堆疊運算元
                    if (opArray.length == 0) {
                        opArray.push(element);
                    } else {
                        opArrayCount = opArray.length - 1;
                        // 左括弧直接堆疊
                        if (element == "(") {
                            opArray.push(element);
                        }
                        // 右刮弧輸出至左括弧
                        else if (element == ")") {
                            while (opArray[opArrayCount] != "(") {
                                posArray.push(opArray.pop());
                                opArrayCount--;
                            }
                            // pop左括弧
                            opArray.pop();
                        } else {
                            // 判斷堆疊中運算元與迴圈運算元的優先順序
                            arrayPr = getPriority(opArray[opArrayCount]);
                            elementPr = getPriority(element);
                            while (arrayPr >= elementPr) {
                                // 堆疊中大於迴圈中則輸出
                                posArray.push(opArray.pop());
                                opArrayCount = opArray.length - 1;
                                arrayPr = getPriority(opArray[opArrayCount]);
                            }
                            // 堆疊迴圈運算元
                            opArray.push(element);
                        }
                    }
                } else {
                    // 堆疊運算子(處理2位數以上願算子)
                    tempString += element;
                }
            }
        }
        if (tempString != "") {
            // 輸出剩餘元素
            posArray.push(parseFloat(tempString));
            tempString = "";
        }
        if (opArray.length != 0) {
            // 輸出剩餘元素
            while (opArray.length != 0) {
                posArray.push(opArray.pop());
            }
        }
        // 輸出後序式(加入空白相隔)
        for (i = 0; i < posArray.length; i++) {
            posString += posArray[i];
            posString += " ";
        }
        // 放入後序式顯示區
        $('.output-text').html(posString);
        // 計算
        calculate(posArray);
    })

    function calculate(posArray) {
        var count = posArray.length;
        var numArray = [];
        var num1 = 0;
        var num2 = 0;
        var answer = 0;
        var op = '';
        // 從頭讀取後序式
        for (i = 0; i < count; i++) {
            element = posArray.shift();
            // 遇運算元計算
            if (isSymbol(element)) {
                op = element;
                // 取出堆疊中運算子
                num2 = numArray.pop();
                num1 = numArray.pop();
                switch (op) {
                    case '+':
                        answer = num1 + num2;
                        break;
                    case '-':
                        answer = num1 - num2;
                        break;
                }
                // 存入運算結果
                numArray.push(answer);
                answer = 0;
            } else {
                // 堆疊運算子
                numArray.push(element);
            }
        }
        // 顯示運算結果同時清空運算子堆疊
        $('.answer-text').html(numArray.pop());
    }

    function isSymbol(element) {
        if (element == '(' || element == ')' || element == '^' ||
            element == '+' || element == '-' || element == '*' ||
            element == '/') {
            return true;
        } else {
            return false;
        }
    }

    function isNumber(element) {
        if (element == '0' || element == '1' || element == '2' ||
            element == '3' || element == '4' || element == '5' ||
            element == '6' || element == '7' || element == '8' ||
            element == '9' || element == '.') {
            return true;
        } else {
            return false;
        }
    }

    function getPriority(op) {
        switch (op) {
            case '^':
                return 3;
                break;
            case '*':
                return 2;
                break;
            case '/':
                return 2;
                break;
            case '+':
                return 1;
                break;
            case '-':
                return 1;
                break;
            case undefined:
                return 0;
                break;
        }
    }
})
