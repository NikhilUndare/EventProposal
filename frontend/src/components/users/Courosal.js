import Image from '../../assets/image.jpg'

export default function Courosal() {
    return (
        <div>
            <div  >
                <img src={Image} alt="courosal" style={{ maxWidth: "100%", objectFit: "fill" }} />
            </div>
        </div>
    )
}
