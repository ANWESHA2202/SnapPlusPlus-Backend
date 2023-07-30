export const generateRandomStreakIcon = () => {
    const streak_icons = [
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701700/-og3BkmqxARekI16cJIuSfbSj9gx6pi87_HDrfmmXLJsMavoRjhBU1v7yMHEIT3bzw_w240-h480-rw_s7kbef.webp',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701700/preview_smkoka.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701700/fire-icon-symbol-simple-design_pzz5dj.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701700/flash-icon-bolt-lightning-lightning-streak-vector-38402792_rnqphf.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701699/speed_streak_fast_motion-24-512_f9qfbz.png',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701699/112464014-flash-icon-thunderbolt-icon-bolt-of-lightning-vector-lightning-illustration-streak-of-lightning_b457la.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701510/3d-white-clipboard-task-management-todo-check-list-efficient-work-project-plan-fast-progress-level-up-concept-assignment-exam-document-cloud-icon-3d-vector-render-cloud-background_412828-963_ynkmhr.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701510/68-682867_google-gets-serious-about-to-do-lists-google-tasks-app-icon_eqxzyq.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701510/3d-white-clipboard-task-management-todo-check-list-purple-background-efficient-work-project-plan-concept-assignment-exam-productivity-solution-icon-3d-icon-vector-render-illustration_412828-1291_qogau7.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701509/197-1973232_checklist-list-todo-notes-note-task-tasks-comments_chpgyb.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701509/checklist-115859_115810_cdlxgv.png',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701508/pngtree-round-button-for-todotasklistchecktime-line-icon-turquoi-png-image_1160562_cpstgk.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701508/pngtree-task-done-notepad-checklist-complete-tasks-to-do-list-icon-isolated-png-image_3421130_vn0upc.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701508/clipboard-with-checklist-todo-check-list-business-education-task-management-productivity-concept-3d-vector-icon-cartoon-minimal-style_365941-814_remphj.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701508/pngtree-todotasklistchecktime-line-icon-png-image_1066151_ldpfc4.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701508/todo-task-list-check-time-white-glyph-icon-vector-23170269_boplp0.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701507/todo-task-list-check-time-flat-color-icon-free-vector_mc3s9y.jpg',
        'https://res.cloudinary.com/ds92ijvd7/image/upload/v1690701507/logo_apmtzh.png'
    ];

    const randomIdx = Math.floor(Math.random() * 18);
    return streak_icons[randomIdx];
}