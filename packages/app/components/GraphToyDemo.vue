<template>
  <div class="grapher-container">
    <div class="header">
      <h1>🧮 GraphToy Core Demo</h1>
      <p>
        Interactive mathematical function graphing with real-time visualization
      </p>
    </div>

    <div class="formulas">
      <div class="formula" style="color: #ff4444">f1(x,t) = sin(x)</div>
      <div class="formula" style="color: #44ff44">f2(x,t) = cos(x + t)</div>
      <div class="formula" style="color: #4444ff">
        f3(x,t) = sin(x) * cos(x + t)
      </div>
    </div>

    <canvas ref="canvasRef" width="800" height="600" class="canvas" />

    <div class="controls">
      <button @click="togglePlay" class="btn">
        {{ paused ? "▶️ Play" : "⏸️ Pause" }}
      </button>
      <button @click="resetTime" class="btn">🔄 Reset</button>
      <button @click="toggleTheme" class="btn">🎨 Theme</button>
    </div>

    <div class="info">
      <p>
        <strong>Controls:</strong> Mouse to pan • Scroll to zoom • Time:
        {{ time.toFixed(2) }}s
      </p>
      <p>
        <strong>Coordinates:</strong> x={{ coords[0].toFixed(2) }}, y={{
          coords[1].toFixed(2)
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
const canvasRef = ref(null);
const paused = ref(true);
const time = ref(0);
const coords = ref([0, 0]);

let grapher = null;

onMounted(async () => {
  // Dynamic import to avoid SSR issues
  const { Grapher } = await import("@graphtoy/core");

  grapher = new Grapher();
  grapher.setCanvas(canvasRef.value);

  // Set formulas
  grapher.setFormulas([
    { id: 0, value: "sin(x)", enabled: true, visualizer: [true, false, false] },
    {
      id: 1,
      value: "cos(x + t)",
      enabled: true,
      visualizer: [false, true, false],
    },
    {
      id: 2,
      value: "sin(x) * cos(x + t)",
      enabled: true,
      visualizer: [false, false, true],
    },
  ]);

  // Event listeners
  grapher.events.on("time", (t) => {
    time.value = t;
  });

  grapher.events.on("coords", ([x, y]) => {
    coords.value = [x, y];
  });

  grapher.events.on("playPause", (isPaused) => {
    paused.value = isPaused;
  });

  grapher.events.on("formulaError", ({ error, formula }) => {
    console.error("Formula error:", error, "in formula:", formula.value);
  });

  grapher.start();

  // Auto-start after a brief delay
  setTimeout(() => {
    grapher.togglePlay();
  }, 1000);
});

onUnmounted(() => {
  if (grapher) {
    grapher.events.removeAllListeners();
  }
});

const togglePlay = () => {
  if (grapher) grapher.togglePlay();
};

const resetTime = () => {
  if (grapher) grapher.resetTime(0);
};

const toggleTheme = () => {
  if (grapher) grapher.toggleTheme();
};
</script>

<style scoped>
.grapher-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header p {
  color: #666;
  font-size: 1.1rem;
}

.formulas {
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
}

.formula {
  margin: 0.5rem 0;
  font-weight: 600;
}

.canvas {
  display: block;
  margin: 0 auto 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.canvas:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.info {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.info p {
  margin: 0.5rem 0;
  color: #4a5568;
  font-size: 0.9rem;
}

.info strong {
  color: #2d3748;
}

@media (max-width: 768px) {
  .canvas {
    width: 100%;
    max-width: 400px;
    height: 300px;
  }

  .controls {
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>
