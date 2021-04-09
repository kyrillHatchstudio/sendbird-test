/**
 * Scroll to top of page.
 * Used e.g. when user clicks on a link
 */
export const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
}