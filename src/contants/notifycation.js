import { store } from 'react-notifications-component';
export const notificatonSuccess = function notificatonSuccess(title) {
    return store.addNotification({
        title: 'Thông báo',
        message: title,
        type: 'success', // 'default', 'success', 'info', 'warning'
        container: 'top-center', // where to position the notifications
        animationIn: ['animated', 'fadeIn'], // animate.css classes that's applied
        animationOut: ['animated', 'fadeOut'], // animate.css classes that's applied
        dismiss: {
            duration: 3000,
        },
    });
};

export const notificatonWarning = function notificatonWarning(title) {
    return store.addNotification({
        title: 'Thông báo',
        message: title,
        type: 'warning', // 'default', 'success', 'info', 'warning'
        container: 'top-center', // where to position the notifications
        animationIn: ['animated', 'fadeIn'], // animate.css classes that's applied
        animationOut: ['animated', 'fadeOut'], // animate.css classes that's applied
        dismiss: {
            duration: 3000,
        },
    });
};