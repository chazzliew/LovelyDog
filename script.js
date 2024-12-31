function calculate() {
    // 获取输入值
    const weight = parseFloat(document.getElementById('weight').value);
    const protein = parseFloat(document.getElementById('protein').value) / 100;
    const fat = parseFloat(document.getElementById('fat').value) / 100;
    const fiber = parseFloat(document.getElementById('fiber').value) / 100;
    const ash = parseFloat(document.getElementById('ash').value) / 100;
    const moisture = parseFloat(document.getElementById('moisture').value) / 100;
    const derFactor = parseFloat(document.getElementById('derFactor').value);

    // 验证输入
    if (!validateInputs(weight, protein, fat, fiber, ash, moisture)) {
        alert('请检查输入值是否正确！');
        return;
    }

    // 计算RER (静息能量需求)
    const rer = 30 * weight + 70;

    // 计算MER (每日能量需求)
    const mer = rer * derFactor;

    // 计算ME (每千克狗粮的代谢能)
    const me = 1000 * (
        protein * 4 + 
        fat * 9 + 
        (1 - protein - fat - fiber - ash) * 4
    ) * (1 - moisture);

    // 计算每日所需狗粮量（克）
    const foodAmount = (mer / me) * 1000;

    // 显示所有结果
    document.getElementById('rerResult').textContent = 
        Math.round(rer * 10) / 10;
    document.getElementById('merResult').textContent = 
        Math.round(mer * 10) / 10;
    document.getElementById('meResult').textContent = 
        Math.round(me * 10) / 10;
    document.getElementById('foodAmount').textContent = 
        Math.round(foodAmount * 10) / 10;
}

function validateInputs(weight, protein, fat, fiber, ash, moisture) {
    if (isNaN(weight) || weight <= 0) return false;
    if (isNaN(protein) || protein < 0 || protein > 1) return false;
    if (isNaN(fat) || fat < 0 || fat > 1) return false;
    if (isNaN(fiber) || fiber < 0 || fiber > 1) return false;
    if (isNaN(ash) || ash < 0 || ash > 1) return false;
    if (isNaN(moisture) || moisture < 0 || moisture > 1) return false;
    
    // 检查所有成分总和是否超过100%
    if (protein + fat + fiber + ash > 1) return false;
    
    return true;
} 