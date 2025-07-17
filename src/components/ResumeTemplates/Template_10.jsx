import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_10 = ({ resumeData }) => {
    return (
        <ZPage $resumelineheight={resumeData.resumelineheight}>
            <TopHeader $heading={resumeData.theme?.heading}>
                <NameTitle>
                    <Name $heading={resumeData.theme?.heading} >{resumeData.firstname} {resumeData.lastname}</Name>
                    {resumeData.jobtitle && <JobTitle>{resumeData.jobtitle}</JobTitle>}
                </NameTitle>
                {resumeData.profileimg && <ProfilePic $heading={resumeData.theme?.heading} src={resumeData.profileimg} alt="profile" />}
            </TopHeader>

            <ZLine>
                <BlockLeft>

                    <ContactBlock>
                        {resumeData.phone || resumeData.email || resumeData.linkedin || resumeData.github || resumeData.website && (
                            <Heading $heading={resumeData.theme?.heading}>Contact</Heading>
                        )}
                        {resumeData.phone && (
                            <ContactItem><strong>Phone: </strong> {resumeData.phone}</ContactItem>
                        )}
                        {resumeData.email && (
                            <ContactItem><strong>Email: </strong> {resumeData.email}</ContactItem>
                        )}
                        {resumeData.linkedin && (() => {
                            const fullUrl = resumeData.linkedin.startsWith("http")
                                ? resumeData.linkedin
                                : `https://${resumeData.linkedin}`;
                            const displayText = fullUrl.replace(/^https?:\/\//, "");

                            return (
                                <ContactItem>
                                    <strong>LinkedIn: </strong>
                                    <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                                        {displayText}
                                    </a>
                                </ContactItem>
                            );
                        })()}

                        {resumeData.github && (() => {
                            const fullUrl = resumeData.github.startsWith("http")
                                ? resumeData.github
                                : `https://${resumeData.github}`;
                            const displayText = fullUrl.replace(/^https?:\/\//, "");

                            return (
                                <ContactItem>
                                    <strong>Github: </strong>
                                    <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                                        {displayText}
                                    </a>
                                </ContactItem>
                            );
                        })()}

                        {resumeData.website && (() => {
                            const fullUrl = resumeData.website.startsWith("http")
                                ? resumeData.website
                                : `https://${resumeData.website}`;
                            const displayText = fullUrl.replace(/^https?:\/\//, "");

                            return (
                                <ContactItem>
                                    <strong>Website: </strong>
                                    <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                                        {displayText}
                                    </a>
                                </ContactItem>
                            );
                        })()}
                    </ContactBlock>

                    {resumeData.profile && (
                        <Section>
                            <Heading $heading={resumeData.theme?.heading}>Profile</Heading>
                            <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resumeData.profile) }} />
                        </Section>
                    )}

                    {resumeData.education?.length > 0 && (
                        <Section>
                            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education || 'Education'}</Heading>
                            {resumeData.education.map((edu, i) => (
                                <EduItem key={i}>
                                    <SubHeading>{edu.degree}</SubHeading>
                                    <strong>{edu.field}</strong>
                                    <SubTitle>{edu.institution}</SubTitle>
                                    <Meta>{edu.startdate} - {edu.enddate}</Meta>
                                    {edu.score && <Meta>Score: {edu.score}</Meta>}
                                </EduItem>
                            ))}
                        </Section>
                    )}

                    {resumeData.skills?.length > 0 && (
                        <Section>
                            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills || 'Skills'}</Heading>
                            <SkillTags $background={resumeData.theme?.background}>
                                {resumeData.skills.map((skill, i) => <span style={{ fontWeight: '600' }} key={i}>{skill}</span>)}
                            </SkillTags>
                        </Section>
                    )}

                    {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
                        section.type === "simple" && (
                            <Section key={idx}>
                                <Heading $heading={resumeData.theme?.heading}>{section.title}</Heading>
                                <SkillTags>
                                    {Object.entries(section.items).map(([key, val]) => <span key={key}>{val}</span>)}
                                </SkillTags>
                            </Section>
                        )
                    ))}

                </BlockLeft>

                <BlockRight>
                    {resumeData.experience?.length > 0 && (
                        <Section>
                            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience || 'Experience'}</Heading>
                            {resumeData.experience.map((exp, i) => (
                                <ExpItem key={i}>
                                    <SubHeading>{exp.position}</SubHeading> <div>{exp.company}</div>
                                    <Meta>{exp.startdate} - {exp.enddate}</Meta>
                                    <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />
                                </ExpItem>
                            ))}
                        </Section>
                    )}

                    {resumeData.projects?.length > 0 && (
                        <Section>
                            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects || 'Projects'}</Heading>
                            {resumeData.projects.map((proj, i) => (
                                <ProjCard $background={resumeData.theme?.background} key={i}>
                                    {proj.name && (
                                        <SubHeading>{proj.name} {proj.github && (
                                            <Link href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </Link>
                                        )}</SubHeading>
                                    )}
                                    {
                                        proj.description && (
                                            <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                                        )
                                    }
                                    {proj.techStack?.length > 0 && <Meta><strong>Tech: </strong> {proj.techStack.join(', ')}</Meta>}
                                </ProjCard>
                            ))}
                        </Section>
                    )}

                    {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, i) => (
                        section.type === 'detailed' && (
                            <Section key={i}>
                                <Heading $heading={resumeData.theme?.heading}>{section.title}</Heading>
                                {Object.entries(section.items).map(([key, item]) => (
                                    <ProjCard $background={resumeData.theme?.background} key={key}>
                                        {item.title && <SubHeading>{item.title} {item.link && (
                                            <Link href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </Link>
                                        )}</SubHeading>}
                                        {item.date && <Meta>{item.date}</Meta>}
                                        {
                                            item.description && (
                                                <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
                                            )
                                        }
                                    </ProjCard>
                                ))}
                            </Section>
                        )
                    ))}
                </BlockRight>
            </ZLine>
        </ZPage>
    );
};

export default Template_10;

const ZPage = styled.div`
  width: 210mm;
  height: 297mm;
  padding: 25px;
  font-family: 'Poppins', sans-serif;
  font-size: 11.5px;
  line-height:  ${props => props.$resumelineheight || '1.6'};
  background: #fff;
  color: #222;
  margin: 0;
  box-sizing: border-box;
`;

const Link = styled.a`
  font-size: 11px;
  margin: 0;
  margin-left: 6px;
  text-decoration: none;
`;


const ContactBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  color: #888;
  font-size: 11px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  i {
    min-width: 14px;
  }
`;

const SubTitle = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid  ${props => props.$heading || '#444'};
  padding-bottom: 10px;
  margin: 0;
`;

const NameTitle = styled.div``;

const Name = styled.h1`
  font-size: 35px;
  margin: 0;
  color: ${props => props.$heading || '#888'};
  text-transform: uppercase;
`;

const JobTitle = styled.h2`
  font-size: 13px;
  font-weight: 400;
  margin: 0;
`;

const SubHeading = styled.h4`
  font-size: 12px;
  font-weight: 600;
  margin: 0;
`;

const ProfilePic = styled.img`
  width: 120px;
  height: 120px;
  border: 3px solid ${props => props.$heading || '#ddd'};;
  border-radius: 10px;
  margin: 0;
  object-fit: cover;
`;

const ZLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  margin-top: 25px;
  gap: 30px;
`;

const BlockLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BlockRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 0;
  a {
    color: #888;
    text-decoration: none;
  }
`;

const Section = styled.div`
margin: 0;
`;

const Heading = styled.h3`
  font-size: 12px;
  text-transform: uppercase;
  color: ${props => props.$heading || '#888'};
  border-left: 4px solid ${props => props.$heading || '#888'};
  padding-left: 10px;
  margin: 0;
  margin-bottom: 8px;
`;

const Text = styled.div`
  font-size: 11px;
  color: #333;
  * {
    margin: 0;
  }
  ul, ol{
    padding-left: 30px;
  }
`;

const Meta = styled.p`
  font-size: 10px;
  font-style: italic;
  color: #666;
  margin: 1px 0;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  span {
    border: 1px solid  ${props => props.$background || '#eee'};;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 10.5px;
  }
`;

const EduItem = styled.div`
  margin-bottom: 10px;
`;

const ExpItem = styled.div`
  margin-bottom: 10px;
`;

const ProjCard = styled.div`
  background-color: ${props => props.$background || '#fafafa'};;
  padding: 10px 14px;
  border-radius: 5px;
  margin-bottom: 10px;
`;