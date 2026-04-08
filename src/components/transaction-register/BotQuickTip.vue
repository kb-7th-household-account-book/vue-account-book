<template>
    <section class="quick-tip-card">
        <span class="tip-icon">💡</span>
        <div class="tip-content">
            <h4 class="tip-title">빠른 팁</h4>
            <p class="tip-desc">카테고리를 정확히 선택하면 지출 패턴을 더 잘 파악할 수 있어요.</p>
        </div>
    </section>
</template>

<script setup>
// 정적인 팁이므로 특별한 상태나 props가 필요 없습니다.
</script>

<style scoped>
.quick-tip-card {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    /* 다크 테마에 어울리는 은은한 브라운 톤 배경 */
    background-color: #1e150b; 
    border: 1px solid #332411; /* 살짝 밝은 테두리로 입체감 부여 */
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
}

.tip-icon {
    font-size: 20px;
    line-height: 1.2;
}

.tip-content {
    display: flex;
    flex-direction: column;
    gap: 6px; /* 제목과 설명 사이의 간격 */
}

.tip-title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #ffb340; /* 포인트 컬러 (노란색) */
}

.tip-desc {
    margin: 0;
    font-size: 13px;
    color: #8e8e93; /* 기존 텍스트 색상과 통일 */
    line-height: 1.5;
    word-break: keep-all; /* 단어 단위로 줄바꿈 되도록 설정 */
}
</style>