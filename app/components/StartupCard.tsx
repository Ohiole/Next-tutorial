import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { EyeIcon } from "lucide-react"
import Image from "next/image";
import { Slug } from "sanity";

type Startup = {
    _id: string;
    _type: "startup";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    slug?: Slug;
    author?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
    };
    views?: number;
    description?: string;
    category?: string;
    image?: string;
    pitch?: string;
}

type Author = {
    _id: string;
    _type: "author";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    image?: string;
    bio?: string;
  };

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author}

const StartupCard = ({ post }: { post: StartupTypeCard }) => {

    const { _createdAt, views, author, title, category, _id, image, description} = post;

  return (
    <li className="startup-card group">
        <div className="flex-between">
            <p className="startup_card_date">
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1 5">
                <EyeIcon className="size-6 text-primary" />
                <span className="text-16-medium">{views}</span>
            </div>
        </div>

        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${author?._id}`}>
                    <p className="text-16-medium line-clamp-1">{author?.name}</p>
                </Link>
                <Link href={`/user/${_id}`}>
                    <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image src={author?.image} alt="placeholder" width={48} height={48} className="rounded-full" />
            </Link>
        </div>

        <Link href={`/ustartup/${_id}`}>
            <p className="startup-card_desc">
                {description}
            </p>

            <img src={image} alt="placeholder" className="startup-card_img" />
        </Link>

        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query/${category?.toLowerCase()}`}>
                <p className="text-16-medium">{category}</p>
            </Link>
            <button className="startup-card_btn">
                <Link href={`/startup/${_id}`}>
                    Details
                </Link>
            </button>
        </div>
    </li>
  )
}

export default StartupCard