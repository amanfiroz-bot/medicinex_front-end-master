const InPut = (props) => {
    return (
        <>
            <label className={`${props.labelclass} mb-0`}>{props.label}</label>
            <input {...props.input} required/>
        </>
    )
}
export default InPut;