export default {
    extends: ['stylelint-config-standard'],
    rules: {
        'unit-allowed-list': ['em', 'rem', 'px', 'vw', 'vh', '%', 's', 'fr', 'svh', 'deg'],
        'selector-class-pattern': null,
    },
    defaultSeverity: 'warning',
};
