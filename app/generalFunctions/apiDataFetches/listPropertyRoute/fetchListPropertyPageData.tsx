import { ListPropertyPageData } from "@/app/types/listPropertyPageData";
import { wpLocationsApiUrl } from "@/app/constants/wpApiUrl";

export const fetchListPropertyPageData = async (locationSlug: string) => {
  const generatedListPropertyPageData = await fetch(
    `${wpLocationsApiUrl}list-property-page-data/${locationSlug}`
  )
    .then((response) => response.json())
    .then((data) => {
      const generatedListPropertyPageData = generateListPropertyPageData(data);

      console.log({ data, generatedListPropertyPageData });

      return generatedListPropertyPageData;
    });

  return generatedListPropertyPageData;
};

const generateListPropertyPageData = (data: {
  intro_section: {
    background_img_url: string;
    statement: string;
    sub_title: string;
    title: string;
  };
  earnings_section: {
    img_url: string;
    statement: string;
    title: string;
    stats: {
      statement: string;
      title: string;
    }[];
  };
  sliding_information_section: {
    statement: string;
    title: string;
    slides: {
      img_url: string;
      statement: string;
      title: string;
    }[];
  };
  clientele_section: {
    img_url: string;
    statement: string;
    title: string;
    client_types: {
      statement: string;
      title: string;
    }[];
  };
  properties_slide_section: {
    img_url: string;
    name: string;
    reviewer: {
      comment: string;
      date: string;
      name: string;
    };
    stats: {
      name: string;
      number: string;
    }[];
  }[];
  single_review_section: {
    background_img_url: string;
    reviewer_comment: string;
    reviewer_name: string;
  };
  how_it_works_section: {
    title: string;
    sub_title: string;
    sub_sections: {
      title: string;
      items: {
        statement: string;
        title: string;
      }[];
    }[];
  };
  sliding_images_section: {
    title: string;
    statement: string;
    images: {
      [key: string]: string;
    };
  };
  faqs_section: {
    title: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}) => {
  const formattedHowItWorksSectionSteps: {
    [key: string]: {
      stepNumber: string;
      subjectText: string;
    }[];
  } = {};

  if (data.how_it_works_section && data.how_it_works_section.sub_sections) {
    data.how_it_works_section.sub_sections.forEach((subSection) => {
      formattedHowItWorksSectionSteps[subSection.title] = subSection.items.map(
        (item) => ({
          stepNumber: item.title,
          subjectText: item.statement,
        })
      );
    });
  }

  const generatedListPropertyPageData: ListPropertyPageData = {
    introSection: {
      title:
        data.intro_section && data.intro_section.title
          ? data.intro_section.title
          : "",
      subTitle:
        data.intro_section && data.intro_section.sub_title
          ? data.intro_section.sub_title
          : "",
      statement:
        data.intro_section && data.intro_section.statement
          ? data.intro_section.statement
          : "",
      backgroundImageUrl:
        data.intro_section && data.intro_section.background_img_url
          ? data.intro_section.background_img_url
          : "",
    },

    earningsSection: {
      title:
        data.earnings_section && data.earnings_section.title
          ? data.earnings_section.title
          : "",
      statement:
        data.earnings_section && data.earnings_section.statement
          ? data.earnings_section.statement
          : "",
      statsImage:
        data.earnings_section && data.earnings_section.img_url
          ? data.earnings_section.img_url
          : "",
      stats:
        data.earnings_section && data.earnings_section.stats
          ? data.earnings_section.stats
          : [],
    },

    slidingInformationSection: {
      title:
        data.sliding_information_section &&
        data.sliding_information_section.title
          ? data.sliding_information_section.title
          : "",
      statement:
        data.sliding_information_section &&
        data.sliding_information_section.statement
          ? data.sliding_information_section.statement
          : "",
      info:
        data.sliding_information_section &&
        data.sliding_information_section.slides
          ? data.sliding_information_section.slides.map((slide) => ({
              title: slide.title,
              information: slide.statement,
              imageUrl: slide.img_url,
            }))
          : [],
    },

    clienteleSection: {
      title:
        data.clientele_section && data.clientele_section.title
          ? data.clientele_section.title
          : "",
      statement:
        data.clientele_section && data.clientele_section.statement
          ? data.clientele_section.statement
          : "",
      imgUrl:
        data.clientele_section && data.clientele_section.img_url
          ? data.clientele_section.img_url
          : "",
      benefits:
        data.clientele_section && data.clientele_section.client_types
          ? data.clientele_section.client_types
          : [],
    },

    propertiesSlideSection: {
      properties: data.properties_slide_section
        ? data.properties_slide_section.map((slide) => ({
            name: slide.name,
            imgUrl: slide.img_url,
            review: {
              from: slide.reviewer.name,
              date: slide.reviewer.date,
              statement: slide.reviewer.comment,
            },
            stats: slide.stats,
          }))
        : [],
    },

    singleReviewSection: {
      from:
        data.single_review_section && data.single_review_section.reviewer_name
          ? data.single_review_section.reviewer_name
          : "",
      statement:
        data.single_review_section &&
        data.single_review_section.reviewer_comment
          ? data.single_review_section.reviewer_comment
          : "",
      backgroundImage:
        data.single_review_section &&
        data.single_review_section.background_img_url
          ? data.single_review_section.background_img_url
          : "",
    },

    howItWorksSection: {
      title:
        data.how_it_works_section && data.how_it_works_section.title
          ? data.how_it_works_section.title
          : "",
      subTitle:
        data.how_it_works_section && data.how_it_works_section.sub_title
          ? data.how_it_works_section.sub_title
          : "",
      steps: formattedHowItWorksSectionSteps,
    },

    slidingImagesSection: {
      title:
        data.sliding_images_section && data.sliding_images_section.title
          ? data.sliding_images_section.title
          : "",
      statement:
        data.sliding_images_section && data.sliding_images_section.statement
          ? data.sliding_images_section.statement
          : "",
      images:
        data.sliding_images_section && data.sliding_images_section.images
          ? Object.values(data.sliding_images_section.images)
          : [],
    },

    faqsSection: {
      title:
        data.faqs_section && data.faqs_section.title
          ? data.faqs_section.title
          : "",
      inquiries:
        data.faqs_section && data.faqs_section.faqs
          ? data.faqs_section.faqs
          : [],
    },
  };

  return generatedListPropertyPageData;
};
