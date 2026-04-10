<script setup>
</script>

<template>
    <section class="quick-tip-card">
        <div class="tip-icon-box">
            <span class="tip-icon">💡</span>
        </div>
        <div class="tip-content">
            <h4 class="tip-title">빠른 팁</h4>
            <p class="tip-desc">카테고리를 정확히 선택하면 지출 패턴을 더 잘 파악할 수 있어요.</p>
        </div>
    </section>
</template>

<style scoped>
.quick-tip-card {
    display: flex;
    align-items: center;
    gap: 16px;
    background: linear-gradient(135deg, rgba(255, 179, 64, 0.05) 0%, rgba(255, 179, 64, 0.02) 100%);
    border: 1px solid rgba(255, 179, 64, 0.1);
    border-radius: 20px;
    padding: 20px;
    backdrop-filter: blur(12px);
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.6s;
    min-width: 0; /* Prevents overflow */
}

.tip-icon-box {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    background: rgba(255, 179, 64, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tip-icon {
    font-size: 20px;
}

.tip-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.tip-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #ffb340;
}

.tip-desc {
    margin: 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
    word-break: keep-all;
    overflow: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>