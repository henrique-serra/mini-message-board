export const index = function index(req, res) {
    res.render('index', { title: 'Home' });
};

// export const notFound = function notFound(req, res) {
//     res.status(404).render('404', { title: 'Not Found' });
// };