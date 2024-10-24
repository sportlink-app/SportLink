import EmptyData from "../../../../components/static/EmptyData";
import NotificationCard from "./NotificationCard";
import notificationStore from "../../../../store/notificationStore";
import PropTypes from "prop-types";

export default function NotificationsList({ hide }) {
  const { notifications } = notificationStore();

  const notificationsList = notifications.length > 0 && (
    <div className="flex flex-col gap-4">
      {notifications.map((notification, index) => (
        <NotificationCard
          key={index}
          notificationType={notification.type}
          teamName={notification.team_name}
          createdAt={notification.created_at}
          sender={notification.sender}
          inviteId={notification.invite_id}
          hide={hide}
        />
      ))}
    </div>
  );

  return (
    <>
      {notifications.length === 0 ? (
        <EmptyData text="You don't have any notifications" className="!h-fit" />
      ) : (
        notificationsList
      )}
    </>
  );
}

NotificationsList.propTypes = {
  hide: PropTypes.func,
};
