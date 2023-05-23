class Helper {
    /**
     * Create DOM Element
     * @param tagName
     * @param content
     * @param attributes
     * @param listeners
     * @returns {*}
     */
    static createElement( tagName, content = undefined, attributes = {}, listeners = {} ) {
        let el = document.createElement(tagName);
        if ( content ) {
            if (Array.isArray(content)) {
                for (const key in content) {
                    el.append(content[key]);
                }
            } else if (typeof content === 'object') {
                el.append(content);
            } else {
                el.innerHTML = content;
            }
        }
        for (const key in attributes) {
            if ( Array.isArray(attributes[key]) ) {
                el.setAttribute(key, attributes[key].join(' '));
            } else {
                el.setAttribute(key, attributes[key]);
            }
        }
        for (const key in listeners) {
            el.addEventListener(key, listeners[key]);
        }
        return el;
    }

    /**
     * Create AJAX Request
     *
     * @param url
     * @param data
     * @param options
     * @returns {any}
     */
    static ajax(url, data = {}, options = {method: "GET"}) {
        let xhr = new XMLHttpRequest();
        switch (options.method.toUpperCase()) {
            case "GET":
                url += '?' + (new URLSearchParams(data)).toString();
                data = null;
                break;
            case "POST":
                data = JSON.stringify(data);
                break;
        }
        xhr.open(options.method, url, false);
        for (const key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
        try {
            xhr.send(data);
            if (xhr.status !== 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                return JSON.parse(xhr.response);
            }
        } catch (err) {
            alert("Запрос не удался");
        }
    }
}

export default Helper;