import React, { useState } from 'react';

// === الستايـلات (Styles) - تصميم عصري ===
const styles = {
  app: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    direction: "rtl", // لتكون الواجهة عربية ومريحة
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    borderBottom: "2px solid #667eea",
    paddingBottom: "15px",
  },
  section: {
    marginBottom: "20px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
    border: "1px solid #eee",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #ddd",
    fontSize: "16px",
    transition: "border-color 0.3s",
    boxSizing: "border-box", // لتجنب مشاكل العرض
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #ddd",
    fontSize: "16px",
    background: "white",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginTop: "15px",
  },
  inputKey: {
    width: "100%", // ملء العمود
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(to right, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginTop: "20px",
  },
  resultArea: {
    marginTop: "30px",
    padding: "25px",
    background: "#2d3436", // خلفية داكنة للنتيجة
    color: "white",
    borderRadius: "12px",
    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.2)",
  },
  resultText: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fab1a0", // لون ذهبي هادئ للنتيجة
    textAlign: "center",
    letterSpacing: "1px",
    margin: "15px 0",
  },
  stepsArea: {
    marginTop: "20px",
    background: "#e8f0fe",
    padding: "15px",
    borderRadius: "8px",
    fontFamily: "monospace",
    direction: "ltr", // خطوات الحل باللغة الإنجليزية
    textAlign: "left",
    maxHeight: "200px",
    overflowY: "auto", // إضافة سكرول في حال كان النص طويلاً
    fontSize: "14px",
    color: "#333",
  },
  stepLine: {
    borderBottom: "1px solid #d0d0d0",
    padding: "5px 0",
  }
};

function App() {
  const [text, setText] = useState("");
  const [keyA, setKeyA] = useState(3); // Default values
  const [keyB, setKeyB] = useState(5); 
  const [method, setMethod] = useState("caesar");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState([]);

  const processText = () => {
    let newSteps = [];
    let resultArr = [];
    const input = text.toUpperCase();

    for (let i = 0; i < input.length; i++) {
      let char = input[i];
      if (char >= 'A' && char <= 'Z') {
        let x = char.charCodeAt(0) - 65; // Convert A to 0, B to 1...
        let resIdx;
        let calculation = "";

        if (method === "caesar") {
          let b = parseInt(keyB);
          resIdx = (x + b) % 26;
          calculation = `(${x} + ${b}) mod 26`;
        } else {
          // Affine: (a*x + b) mod 26
          let a = parseInt(keyA);
          let b = parseInt(keyB);
          resIdx = (a * x + b) % 26;
          calculation = `(${a} * ${x} + ${b}) mod 26`;
        }

        let encryptedChar = String.fromCharCode(resIdx + 65);
        resultArr.push(encryptedChar);
        newSteps.push(`${char} (x=${x}) → ${calculation} = ${resIdx} → ${encryptedChar}`);
      } else {
        resultArr.push(char); // Keep spaces and symbols
      }
    }
    setResult(resultArr.join(''));
    setSteps(newSteps);
  };

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={{ margin: 0, fontSize: '28px' }}>نظام التشفير الكلاسيكي</h1>
          <p style={{ color: '#666', marginTop: '5px' }}>بروجكت تشفير القيصر وأفاين مع إظهار خطوات الحل</p>
        </div>

        {/* 1. المدخلات */}
        <div style={styles.section}>
          <label style={styles.label}>النص المراد تشفيره (بالإنجليزية):</label>
          <input 
            type="text"
            placeholder="مثال: Hello World" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* 2. الإعدادات والمفاتيح */}
        <div style={styles.section}>
          <label style={styles.label}>اختر طريقة التشفير:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={styles.select}>
            <option value="caesar">تشفير القيصر (Caesar Shift)</option>
            <option value="affine">تشفير أفاين (Affine Cipher)</option>
          </select>

          <div style={styles.row}>
            <div style={{flex: 1}}>
              <label style={styles.label}>المفتاح Shift / b (الجمع):</label>
              <input type="number" value={keyB} onChange={(e) => setKeyB(e.target.value)} style={styles.inputKey} />
            </div>
            
            {method === "affine" && (
              <div style={{flex: 1}}>
                <label style={styles.label}>المفتاح a (الضرب):</label>
                <input type="number" value={keyA} onChange={(e) => setKeyA(e.target.value)} style={styles.inputKey} />
                <span style={{fontSize: '11px', color: '#e74c3c'}}>*يجب أن يكون فردياً ولا يقسم على 13</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. زر التشغيل */}
        <button 
          onClick={processText} 
          style={styles.button}
          onMouseOver={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 5px 15px rgba(118,75,162,0.4)'; }}
          onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
        >
          تشفير النص الآن
        </button>

        {/* 4. لوحة النتائج (تظهر عند وجود نتيجة) */}
        {result && (
          <div style={styles.resultArea}>
            <h3 style={{ margin: '0 0 10px 0', textAlign: 'center', borderBottom: '1px solid #555', paddingBottom: '10px' }}>النتيجة النهائية:</h3>
            <div style={styles.resultText}>{result}</div>
            
            {steps.length > 0 && (
              <>
                <h4 style={{ margin: '20px 0 10px 0', color: '#eee' }}>تفاصيل العملية الرياضية (خطوة بخطوة):</h4>
                <div style={styles.stepsArea}>
                  {steps.map((step, index) => (
                    <div key={index} style={styles.stepLine}>
                      {step}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;