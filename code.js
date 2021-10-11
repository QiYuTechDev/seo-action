let fn = async () => {
    const links = [...document.querySelectorAll('.storylink')]
        .map((a) => {
            return {
                title: a.innerText,
                href:  a.href,
            };
        });
    return {contents: links};
};
