function AddClass(el, name)
{
	arr = el.className.split(" ");
    if (arr.indexOf(name) == -1)
        el.className += " " + name;
}
function RemoveClass(el, name)
{
	el.className = el.className.replace(name, "");
}